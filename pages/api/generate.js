// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

// const MOCK_DATA = ['#f6fffa', '#616c6e', '#cdf7f6', '#000000', '#428136']

export default async function generateAPI(req, res) {
  if (req.method === 'POST') {
    const result = await axios.post(process.env.BACKEND_SERVICE_URL, req.body)
    if (result.status === 200) {
      res.status(200).json(result.data)
    } else {
      res.status(500).json({ error: 'Internal Server Error.' })
    }
    // res.status(200).json({ colors: MOCK_DATA })
  } else {
    res.status(200).json({ message: 'Use POST please.' })
  }
}
