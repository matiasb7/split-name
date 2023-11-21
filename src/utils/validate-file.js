export default function validateFile (file) {
  const validTypes = ['text/csv', 'application/json'];
  return validTypes.includes(file.type)
}