export default (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json({ status: 'User is online' });
      break;
    case 'POST':
      res.status(200).json({ message: 'User status updated successfully' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
