declare module '@datadome/react-native-datadome' {
  import {Ref} from 'react';

  function DataDomeFetch(
    uri: RequestInfo,
    options: RequestInit & {datadome?: boolean},
  ): Promise<Response>;

  const DataDome: {
    getInstance(): {
      setSdkKey(key: string): void;
      setContainerViewRef(ref: Ref<Record<string, unknown>>): void;
      enableVerboseLogs(enable: boolean): void;
    };

    getDataDomeCookie(): Promise<string>;
  };

  function DataDomeModal({
    onRef,
  }: {
    onRef: (ref: Ref<Record<string, unknown>>) => void;
  }): JSX.Element;
}
