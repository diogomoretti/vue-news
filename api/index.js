export default async function handler(req, res) {
  try {
    const path = req.url
    const apiUrl = `https://www.tabnews.com.br/api${path}`
    console.log('Fetching URL:', apiUrl)

    const response = await fetch(apiUrl)
    if (!response.ok) {
      return res.status(response.status).json({ error: 'External API error', status: response.status })
    }
    const data = await response.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(data)

  } catch (error) {
    console.error('Erro na função:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
