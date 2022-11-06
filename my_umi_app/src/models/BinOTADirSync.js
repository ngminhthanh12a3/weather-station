import { API_GET_BIN_OTA_DIR_LIST_URL, API_URL, API_OPEN_BIN_OTA_DIR_NAME_PATH } from '@/constants';
import { API_Inits, requestToAPI } from '@/handlers';
// import { response } from 'express';
import { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';

export default () => {
  const { socket } = useModel('deviceInfo');
  const tableActionRef = useRef();
  const [BinOTADirListOBJ, setBinOTADirListOBJ] = useState({
    data: [],

    page: 1,
    success: true,
    total: 5,
  });
  const [currentSubdir, setCurrentSubdir] = useState('/');
  const [currentFileDetail, setCurrentFileDetail] = useState('');
  const [currentFilename, setCurrentFilename] = useState('');
  // const [filterFileListOBJ, setFilterFileListOBJ] = useState([]);
  useEffect(async () => {
    const FetchURL = new URL(API_GET_BIN_OTA_DIR_LIST_URL);
    FetchURL.searchParams.append('subDir', currentSubdir);

    const BinOTADirListOBJAPI = await requestToAPI(
      FetchURL.toString(),
      API_Inits({ method: 'GET' }),
    );
    setBinOTADirListOBJ(BinOTADirListOBJAPI);

    socket.on('reload_file_list', async () => {
      const fileListOBJAPI = await requestToAPI(FetchURL.toString(), API_Inits({ method: 'GET' }));
      setBinOTADirListOBJ(fileListOBJAPI);

      // reload table
      tableActionRef.current?.reload();
    });
  }, []);

  const handleProTableRequest = async (params = {}, sort, filter) => {
    console.log('subDir', currentSubdir);
    const { version, startTime, endTime, isDirectory } = params;
    let filterBinOTADirList_local = [...BinOTADirListOBJ.data];

    if (isDirectory === true || isDirectory === 'true')
      filterBinOTADirList_local = await filterBinOTADirList_local.filter(
        (dirOBJ) => dirOBJ.isDirectory === true,
      );
    else if (isDirectory === false || isDirectory === 'false')
      filterBinOTADirList_local = await filterBinOTADirList_local.filter(
        (dirOBJ) => dirOBJ.isDirectory === false,
      );

    if (version) {
      filterBinOTADirList_local = await filterBinOTADirList_local.filter(
        (DirOBJ) => DirOBJ.version == version,
      );
    }

    if (startTime && endTime) {
      // console.log(filterFileList_local.map((file) => new Date(file.ctimeMs).toISOString()));
      filterBinOTADirList_local = await filterBinOTADirList_local.filter((dirOBJ) => {
        const { ctimeMs } = dirOBJ;
        const startTimeMs = new Date(startTime).getTime();
        const endTimeMs = new Date(endTime).getTime();

        return ctimeMs >= startTimeMs && ctimeMs <= endTimeMs;
      });
    }
    if (currentSubdir !== '/') {
      await filterBinOTADirList_local.unshift({
        key: '/..-true',
        name: '/..',
        path: currentSubdir + '/..',
        isDirectory: true,
      });
      console.log(filterBinOTADirList_local);
    }

    return { ...BinOTADirListOBJ, data: [...filterBinOTADirList_local] };
  };
  const HandleOpenDirName = async (entity) => {
    const FETCH_URL = new URL(API_OPEN_BIN_OTA_DIR_NAME_PATH, API_URL);
    FETCH_URL.searchParams.append('subDir', entity.path);
    FETCH_URL.searchParams.append('isDirectory', entity.isDirectory);
    const FETCH_DATA = await requestToAPI(FETCH_URL, API_Inits({ method: 'GET' }));
    if (entity.isDirectory) {
      const { NORMALIZE_PATH = '/' } = FETCH_DATA;
      setCurrentSubdir(NORMALIZE_PATH);
      setBinOTADirListOBJ(FETCH_DATA);

      // reload table
      tableActionRef.current?.reload();
    } else {
      console.log(FETCH_DATA);
      const { data = { data: [] } } = FETCH_DATA;
      /**
       * @param {Buffer} FILE_DETAIL
       */
      const FILE_DETAIL = new Buffer(data.data).toString('hex');
      setCurrentFilename(entity.name);
      setCurrentFileDetail(FILE_DETAIL.toString());
    }
  };
  return {
    BinOTADirListOBJ,
    handleProTableRequest,
    tableActionRef,
    setCurrentSubdir,
    currentSubdir,
    HandleOpenDirName,
    setCurrentFilename,
    currentFilename,
    currentFileDetail,
  };
};
