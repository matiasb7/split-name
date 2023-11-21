const jsonHeaders = {
  'Content-Type': 'application/json'
}
export default function createResponse(body, status = 200, headers = jsonHeaders) {
  return new Response(JSON.stringify(body), {
    status,
    headers: headers
  });
}