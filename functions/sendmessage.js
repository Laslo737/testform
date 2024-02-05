export async function onRequest(context) {
  const { request } = context
  return new Response('Hello Cuka')
}