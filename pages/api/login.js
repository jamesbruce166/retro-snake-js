export default function handler(req, res) {
	try {
		const {
			query: { username, password },
		} = req;

		if (username == 'james' && password == 'password') {
			res.status(200).json({ message: 'Login succeeded' });
		} else {
			res.status(401).json({
				message: 'Username or password not recognised',
			});
		}
	} catch (err) {
		res.status(500).json({
			message: 'We ran into an error, please try again in a few moments.',
		});
	}
}
