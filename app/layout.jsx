import './global.css';

import Navbar from './Header';
import Footer from './Footer';

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
			</head>
			<body>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
