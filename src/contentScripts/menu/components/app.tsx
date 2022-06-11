import Card from './Card';
import Sidebar from './Sidebar';
import bannersEntry from './sidebar/Banners';
import displayEntry from './sidebar/Display';
import themeEntry from './sidebar/Theme';
import tweaksEntry from './sidebar/Tweaks';

const App = () => (
	<Card title='Accelerant' topPadding>
		<Sidebar
			initialValue={0}
			items={[displayEntry, bannersEntry, themeEntry, tweaksEntry]}
		/>
	</Card>
);

export default App;
