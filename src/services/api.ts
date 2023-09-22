import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://docs.bcomo.com/',
  headers: {
    'x-api-key': 'Affan',
  },
});

export function getIdByQrCode(qrCode: string) {
  return instance.get(`qrcode/${qrCode}`);
}
