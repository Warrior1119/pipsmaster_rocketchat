import React from 'react';
import PropTypes from 'prop-types';
import {
	Text, ScrollView, View, StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import sharedStyles from './Styles';
import scrollPersistTaps from '../utils/scrollPersistTaps';
import { isAndroid } from '../utils/deviceInfo';
import I18n from '../i18n';
import DisclosureIndicator from '../containers/DisclosureIndicator';
import StatusBar from '../containers/StatusBar';
import { COLOR_SEPARATOR, COLOR_WHITE } from '../constants/colors';
import openLink from '../utils/openLink';

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f7f8fa',
		flex: 1
	},
	scroll: {
		marginTop: 35,
		backgroundColor: COLOR_WHITE,
		borderColor: COLOR_SEPARATOR,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	separator: {
		backgroundColor: COLOR_SEPARATOR,
		height: StyleSheet.hairlineWidth,
		width: '100%',
		marginLeft: 20
	},
	item: {
		width: '100%',
		height: 48,
		backgroundColor: COLOR_WHITE,
		paddingLeft: 20,
		paddingRight: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	text: {
		...sharedStyles.textMedium,
		...sharedStyles.textColorNormal,
		fontSize: 18
	}
});

const Separator = () => <View style={styles.separator} />;

class QuickLinks extends React.Component {
	static navigationOptions = () => ({
		title: I18n.t('QuickLinks')
	})

	static propTypes = {
		server: PropTypes.string
	}

	onPressItem = ({ route }) => {
		// const { server } = this.props;
		// if (!server) {
		// 	return;
		// }
		if (route) {
			openLink(`${ route }`);
		}
		// openLink(`${ server }/${ route }`);
	}

	renderItem = ({ text, route, testID }) => (
		<RectButton style={styles.item} onPress={() => this.onPressItem({ route })} testID={testID}>
			<Text style={styles.text}>{I18n.t(text)}</Text>
			<DisclosureIndicator />
		</RectButton>
	)

	render() {
		return (
			<SafeAreaView style={styles.container} testID='quick-links-view' forceInset={{ vertical: 'never' }}>
				<StatusBar />
				<ScrollView {...scrollPersistTaps} contentContainerStyle={styles.scroll}>
					{this.renderItem({ text: 'My_Subscription', route: 'https://my.thinkmelius.com', testID: 'quick-subscription-button' })}
					<Separator />
					{this.renderItem({ text: 'Store', route: 'https://store.thinkmelius.com', testID: 'quick-store-button' })}
					<Separator />
					{this.renderItem({ text: 'Traders_Gemini', route: 'https://tradersgemini.com', testID: 'quick-trader-button' })}
					<Separator />
					{this.renderItem({ text: 'iGoLearn', route: 'http://igolearn.com', testID: 'quick-learn-button' })}
					<Separator />
					{this.renderItem({ text: 'iGoTrade', route: (isAndroid ? 'https://play.google.com/store/apps/details?id=com.melius&hl=en' : ''), testID: 'quick-gotrade-button' })}
					<Separator />
					{this.renderItem({ text: 'iGoPro', route: (isAndroid ? 'https://play.google.com/store/apps/details?id=com.melius&hl=en' : ''), testID: 'quick-gopro-button' })}
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
	server: state.server.server
});

export default connect(mapStateToProps)(QuickLinks);
