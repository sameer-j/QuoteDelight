import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { SCREEN_HEIGHT } from '../../constants';
import BackButton from '../../components/BackButton';
import QuoteListEmptyView from '../../components/QuoteListEmptyView';
import QuoteListItem from './QuoteListItem';
import { getData } from '../../redux/actions';

const favoriteEmptyIcon = require('../../assets/favoriteEmpty.png');
const favoriteFilledIcon = require('../../assets/favoriteFilled.png');

const QuoteListing = () => {
  console.log('rendering quotelisting');
  const dispatch = useDispatch();
  const favorites = useSelector(({ userData }) => userData.favorites);
  const [showFavoritesFlag, setShowFavoritesFlag] = useState(false);
  // TODO: memoise this?
  const getFavoriteQuotes = (allQuotes) => {
    return allQuotes.filter((quote) => favorites[quote.id]);
  };
  let quotes = useSelector(({ quotes }) => {
    let quotesList = Object.values(quotes.data);
    if (showFavoritesFlag) {
      return getFavoriteQuotes(quotesList);
    }
    return quotesList;
  });

  useEffect(() => {
    getData(dispatch);
  }, []);

  return (
    <View style={{ marginTop: 70, flex: 1 }}>
      <View style={styles.topBar}>
        <BackButton />
        <Pressable onPress={() => setShowFavoritesFlag(!showFavoritesFlag)}>
          <Image
            source={showFavoritesFlag ? favoriteFilledIcon : favoriteEmptyIcon}
          />
        </Pressable>
      </View>
      <View style={styles.quoteListBody}>
        <FlatList
          data={quotes}
          renderItem={({ item }) => (
            <QuoteListItem item={item} favorite={favorites[item.id]} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          ListEmptyComponent={<QuoteListEmptyView />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quoteListBody: {
    paddingHorizontal: 20,
    maxHeight: SCREEN_HEIGHT * 0.9,
    flex: 1,
  },
});

export default QuoteListing;
