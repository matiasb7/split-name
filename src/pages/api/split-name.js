import splitNames from "../../utils/split-name.js";
import createResponse from "../../utils/api-response.js";
export async function POST({ request }) {
  const formData = await request.formData();
  const file = formData.get('file')

  if (!file) return createResponse({ error: 'No file uploaded' }, 400)

  const text = await file.text()
  let namesArray;

  if (file.type === 'text/csv') {
    const rows = text.split('\n')
    namesArray = rows.map(row => row.trim().split(',')[0]);
  } else if (file.type === 'application/json') {
    namesArray = JSON.parse(text);
  } else {
    return createResponse({ error: 'Invalid file type' }, 400)
  }

  const splitNamesResult = splitNames(namesArray);
  return createResponse(splitNamesResult, 200)
}
