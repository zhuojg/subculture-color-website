// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

// const MOCK_DATA = [
//   {
//     text: '123',
//     colors: '#123456,#123456,#123456,#123456,#123456',
//     time: 1632137139,
//     id: 1,
//   },
// ]

export default async function generateAPI(req, res) {
  if (req.method === 'GET') {
    const result = await axios.get(`${process.env.BACKEND_SERVICE_URL}/poems`)
    if (result.status === 200) {
      res.status(200).json(result.data)
    } else {
      res.status(500).json({ error: 'Internal Server Error.' })
    }
    // res.status(200).json(MOCK_DATA)
  } else {
    res.status(200).json({ message: 'Use GET please.' })
  }
}
