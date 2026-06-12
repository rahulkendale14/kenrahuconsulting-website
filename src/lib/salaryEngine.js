// Salary planning recommendation engine — priority waterfall allocation
// Fixed obligations → Essentials (with floors) → Savings/Buffer/Flexible

const SAVINGS_RATES = { conservative: 0.20, balanced: 0.30, aggressive: 0.50 }
const BUFFER_RATES  = { conservative: 0.15, balanced: 0.10, aggressive: 0.05 }

export function formatCurrency(amount) {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`
}

export function pct(value, total) {
  if (total <= 0) return 0
  return Math.round((value / total) * 100)
}

// Core allocation engine. savingsOverride forces a specific savings amount (used for alternates).
export function computeAllocation(inputs, savingsOverride) {
  const { salary, bills, emi, household, medical, irregular, dependents, preference } = inputs

  const fixedObligations  = bills + emi
  const householdWeighted = household * (1 + dependents * 0.08)
  const medicalReserve    = Math.max(medical, 500)
  const irregularReserve  = Math.max(irregular, salary * 0.03)

  const essentials = fixedObligations + householdWeighted + medicalReserve + irregularReserve
  const remaining  = Math.max(salary - essentials, 0)

  let savings, buffer, flexible

  if (savingsOverride !== undefined) {
    savings = Math.min(Math.max(savingsOverride, 0), remaining)
    buffer  = remaining * BUFFER_RATES[preference]
    if (savings + buffer > remaining) buffer = Math.max(remaining - savings, 0)
    flexible = Math.max(remaining - savings - buffer, 0)
  } else {
    savings  = remaining * SAVINGS_RATES[preference]
    buffer   = remaining * BUFFER_RATES[preference]
    flexible = Math.max(remaining - savings - buffer, 0)
  }

  const total = fixedObligations + householdWeighted + medicalReserve + irregularReserve + savings + buffer + flexible

  return {
    fixedObligations,
    household: householdWeighted,
    medical: medicalReserve,
    irregular: irregularReserve,
    savings,
    buffer,
    flexible,
    total,
    remaining: salary - total,
  }
}

function computeGoalCheck(inputs, allocation) {
  const { currentSavings, annualGoal, salary } = inputs
  const essentials = allocation.fixedObligations + allocation.household + allocation.medical + allocation.irregular

  const projectedAnnual = currentSavings + allocation.savings * 12
  const gap = annualGoal - projectedAnnual

  return {
    projectedAnnual,
    gap,
    isAchievable: gap <= 0,
    isStressed: essentials > salary * 0.85,
  }
}

function computeAlternates(inputs, recommended, goalCheck) {
  const { currentSavings, annualGoal } = inputs
  const gap = goalCheck.gap

  const monthlySavingsNeeded = Math.max((annualGoal - currentSavings) / 12, 0)

  const boostAllocation = computeAllocation(inputs, monthlySavingsNeeded)

  const monthsNeeded = recommended.savings > 0
    ? Math.ceil((annualGoal - currentSavings) / recommended.savings)
    : null

  const hybridSavings    = recommended.savings + (gap / 12) * 0.5
  const hybridAllocation = computeAllocation(inputs, hybridSavings)
  const hybridMonths     = hybridAllocation.savings > 0
    ? Math.ceil((annualGoal - currentSavings) / hybridAllocation.savings)
    : null

  return [
    {
      id: 'boost',
      title: 'Maximize savings now',
      description: `Save ${formatCurrency(Math.round(monthlySavingsNeeded))} monthly. Reduces flexible spend but hits your goal in exactly 12 months.`,
      monthlySavingsNeeded: Math.round(monthlySavingsNeeded),
      monthsNeeded: 12,
      allocation: boostAllocation,
    },
    {
      id: 'extend',
      title: 'Keep current pace, extend timeline',
      description: `At your recommended savings rate, you will reach your goal in ${monthsNeeded ?? '—'} months. Less pressure now, longer runway.`,
      monthlySavingsNeeded: Math.round(recommended.savings),
      monthsNeeded,
      allocation: recommended,
    },
    {
      id: 'hybrid',
      title: 'Split the difference',
      description: `Save a bit more each month and reach your goal in ~${hybridMonths ?? '—'} months. Balances comfort and ambition.`,
      monthlySavingsNeeded: Math.round(hybridAllocation.savings),
      monthsNeeded: hybridMonths,
      allocation: hybridAllocation,
    },
  ]
}

export function computePlan(inputs) {
  const recommended = computeAllocation(inputs)
  const goalCheck   = computeGoalCheck(inputs, recommended)
  const alternates  = goalCheck.isAchievable ? [] : computeAlternates(inputs, recommended, goalCheck)
  return { inputs, recommended, goalCheck, alternates }
}
