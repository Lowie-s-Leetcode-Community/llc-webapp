export default function formatDate(dateInISOStringFormat) {
  const date = new Date(dateInISOStringFormat);
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
  };
  return date.toLocaleDateString(undefined, options);
}
