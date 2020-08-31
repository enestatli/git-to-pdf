import React from 'react';
import {Box, MyText} from './shared';
import {Image, FlatList} from 'react-native';

const letters = 'abcçdefgğhıijklmnoöprsştuüvyz';
const imgUrl = (letter) =>
  `https://sozluk.gov.tr/assets/img/isaret/${letter}.gif`;
const fixLetter = (letter) => {
  const specials = [
    {r: 'â', l: 'a'},
    {r: 'î', l: 'i'},
    {r: 'û', l: 'ü'},
  ];
  let l = letter;
  const specialIndex = specials.find((s) => s.r === l);
  if (specialIndex) {
    l = specialIndex.l;
  }
  return l;
};

const fixKeyword = (keyword) => keyword.split('').map((l) => fixLetter(l));
const hasGif = (letter) => letters.includes(letter);

const SignContent = ({keyword}) => {
  const fixed = fixKeyword(keyword);
  return (
    <Box
      height="100%"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.16,
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: -2,
        },
      }}>
      <Box
        flexDirection="column"
        bg="white"
        flex={1}
        mt={20}
        borderRadius={15}
        px={24}
        pt={16}
        pb={48}>
        <Box width="100%">
          <Box
            height={4}
            width={58}
            borderRadius={14}
            bg="light"
            mx="auto"
            mb={16}
          />
        </Box>

        <Box>
          <MyText color="textDark" fontWeight="700" fontSize={18}>
            Türk İşaret Dili
          </MyText>
          <MyText color="textLight" mt={8}>
            Parmak Alfabesiyle Gösterilişi
          </MyText>
        </Box>

        <Box width="100%" flex={1} mt={32}>
          <FlatList
            horizontal={true}
            data={fixed.map((el, i) => ({letter: el, id: i + '_' + el}))}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <Box width={10} />}
            renderItem={({item}) => {
              return (
                <Box>
                  <Box>
                    {hasGif(item.letter) ? (
                      <Box
                        height={64}
                        width={102}
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={5}
                        borderWidth={2}
                        borderColor="softRed">
                        <Image
                          style={{height: 44, width: 123 / 2}}
                          source={{uri: imgUrl(item.letter)}}
                        />
                      </Box>
                    ) : (
                      <Box height={64} width={44} bg="white" />
                    )}
                  </Box>
                  <Box
                    bg="softRed"
                    mt={6}
                    borderRadius={3}
                    height={22}
                    alignItems="center"
                    justifyContent="center">
                    <MyText fontWeight="bold">{item.letter}</MyText>
                  </Box>
                </Box>
              );
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export {SignContent};
