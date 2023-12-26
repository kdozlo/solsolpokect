/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/order
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  ImageBackground,
} from 'react-native';
import Title from '../components/Title';
import { images } from '../constants/index';
// eslint-disable-next-line import/order, no-unused-vars
import Divider from '../components/Divider';
import ChooseQuest from './ChooseQuest';
import { useRecoilValue } from 'recoil';
import { QuestListState } from '../recoil/UserInfo';
import { useQuestList } from '../hooks/use-questList';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const minColumnSize = WIDTH >= 500 ? 200 : 130;
const divisor = WIDTH / minColumnSize;
const numColumns = Math.floor(divisor);
const columnSize = WIDTH / numColumns;

export default ({ navigation }) => {
  const DATA = useRecoilValue(QuestListState);

  const { deleteList } = useQuestList();

  //icons.questMoney
  const icons = {
    0: images.background,
    1: images.star,
    2: images.Cam,
    3: images.EmptyCloud,
    4: images.AddCloud,
    5: images.QuestCountTitle,
  };

  const renderItem = ({
    item: { id, type, allow, category, complete, goal, missionId, missionName, picture, reward },
  }) => {
    let move = 0;
    if (category === 0) {
      move = 2;
    } else if (category === 1) {
      move = 1;
    }

    if (type === 3) {
      return (
        <TouchableOpacity
          key={`index - ${id}`}
          onPress={() => navigation.navigate('ChooseQuest')}
          style={[styles.renderItemStyle, { backgroundColor: 'transparent', marginTop: 40, left: 10 }]}>
          <Image source={icons[4]} style={[styles.renderItemImage]} resizeMode="contain" />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={`index - ${missionId}`}
        onPress={() =>
          navigation.navigate(`QuestType${move}`, {
            allow,
            category,
            complete,
            goal,
            missionId,
            missionName,
            picture,
            reward,
          })
        }
        onLongPress={() => {
          deleteList(id);
        }}
        style={[styles.renderItemStyle, { bottom: 20 }]}>
        <ImageBackground source={icons[3]} imageStyle={{ width: columnSize + 10, height: columnSize + 10 }}>
          <Image
            source={icons[move]}
            resizeMode="contain"
            style={{
              top: 25,
              left: 65,
              width: 45,
              height: 45,
            }}
          />
          <Text style={styles.renderItemText}>{missionName}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={icons[0]}
        imageStyle={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        style={{ flex: 1 }}>
        {/* Header 부분 */}
        <Title navigation={navigation} title={'가계부 보기'} />
        <TouchableOpacity style={[styles.forImageView, { top: 50 }]} onPress={() => navigation.navigate('SignUp')}>
          {/* 회원 카드 부분  */}
          <Image source={require('../assets/images/user_gold_card.png')} style={[styles.forImage]} />
          <View style={styles.forNameView}>
            <Text style={styles.forText}>김 대 영</Text>
          </View>
          <View style={styles.forMoneyView}>
            <Text style={styles.forMoneyText}>1,017,040 원</Text>
          </View>
          <View style={styles.forTierView}>
            <Text style={styles.forTierText}>GOLD</Text>
          </View>
        </TouchableOpacity>

        <Divider />

        <View
          style={{
            height: HEIGHT,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            flex: 10,
          }}>
          <View>
            <Image source={icons[5]} style={{ width: 150, height: 50, alignSelf: 'center' }} />
            <Text style={{ alignSelf: 'center', color: '#ffffff', fontSize: 30, bottom: 10 }}>{DATA.length} / 10</Text>
          </View>
          <FlatList renderItem={renderItem} keyExtractor={item => item.missionId} data={DATA} numColumns={3} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  forImageView: {
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  forImage: {
    width: WIDTH / 1.5,
    height: HEIGHT / 4,
    borderRadius: 50,
  },
  forNameView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 420,
    bottom: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },

  forMoneyView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 420,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    paddingLeft: 20,
  },
  forTierView: {
    position: 'absolute',
    top: 200,
    left: 0,
    right: 420,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  forText: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  forMoneyText: {
    fontSize: 40,
    fontWeight: 'bold',
  },

  forTierText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  renderItemStyle: {
    width: columnSize,
    height: columnSize,
    justifyContent: 'center',
    alingItems: 'center',
    borderRadius: 60,
  },
  renderItemImage: {
    width: columnSize + 30,
    height: columnSize + 30,
    alignSelf: 'center',
  },

  renderItemText: {
    top: 15,
    fontSize: 15,
    fontStyle: 'italic',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#3D70FF',
  },
});
