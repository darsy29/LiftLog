export default function SuggestionBanner({ suggestion }) {
  if (!suggestion) return null

  const tone =
    suggestion.hitTargetLastSession === true
      ? 'suggestion suggestion-up'
      : suggestion.hitTargetLastSession === false
      ? 'suggestion suggestion-hold'
      : 'suggestion suggestion-new'

  return (
    <p className={tone} role="status">
      {suggestion.message}
    </p>
  )
}
