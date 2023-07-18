import data from './pollution.json';

export default function handler(req, res) {
    res.status(200).json(data)
}