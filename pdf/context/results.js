import React, {createContext, useRef, useState} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';

import parseResult from '../utils/parseResult';
import {getSoundCode, getDetailData} from '../utils/api';
import {SignContent} from '../components/SignLanguage';

export const resultsContextDefault = {
  data: {},
  soundCode: '',
  signSheet: false,
  openSignSheet: () => {},
  closeSignSheet: () => {},
  clearResults: () => {},
  getResults: () => {},
};

const resultsContext = createContext(resultsContextDefault);

const ResultsProvider = ({children}) => {
  const [results, setResults] = useState({});
  const [soundCode, setSoundCode] = useState('');
  const [signSheetStatus, setSignSheetStatus] = useState(false);
  const [signKeyword, setSignKeyword] = useState('');
  const signSheetRef = useRef();

  const resultsValues = {
    data: results,
    soundCode: soundCode,
    signSheet: signSheetStatus,
    clearResults: () => {
      setResults({});
      setSoundCode('');
      signSheetRef.current.snapTo(1);
      signSheetRef.current.snapTo(1);
      setSignKeyword('');
      setSignSheetStatus(false);
    },
    openSignSheet: (k) => {
      signSheetRef.current.snapTo(0);
      signSheetRef.current.snapTo(0);
      setSignKeyword(k);
      setSignSheetStatus(true);
    },
    closeSignSheet: (k) => {
      signSheetRef.current.snapTo(1);
      signSheetRef.current.snapTo(1);
      setSignKeyword('');
      setSignSheetStatus(false);
    },
    getResults: async (k) => {
      setResults({});
      setSoundCode('');
      getDetailData(k)
        .then((res) => {
          setResults(parseResult(res[0]));
        })
        .catch((err) => {
          console.log('error when fetching results', err);
        });
      getSoundCode(k)
        .then((res) => {
          setSoundCode(res?.[0]?.soundCode ?? '');
        })
        .catch((err) => {
          console.log('error when fetching soundCode: ', err);
        });
    },
  };

  return (
    <resultsContext.Provider value={resultsValues}>
      {children}
      <BottomSheet
        ref={signSheetRef}
        onCloseEnd={() => {
          setSignKeyword('');
          setSignSheetStatus(false);
        }}
        snapPoints={[302, 0]}
        initialSnap={1}
        renderContent={() => <SignContent keyword={signKeyword} />}
      />
    </resultsContext.Provider>
  );
};

export {ResultsProvider};

export default resultsContext;
