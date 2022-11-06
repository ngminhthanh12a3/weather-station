import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history, setLocale,  } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import Exception403 from '@/pages/exception/403';
import defaultSettings from '../config/defaultSettings';
import { API_Inits, requestToAPI } from './handlers';
import { API_GET_CURRENT_USER_URL } from './constants';
import { message } from 'antd';
import { SetupNortification, DisplayNotification } from './service-workers';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async (currentUsername = '') => {
    try {
      // const { pathname } = history.location;
      // if (pathname !== loginPath) {
      //   const localStorageUsername = localStorage.getItem('currentUsername');
      //   if (localStorageUsername) currentUsername = localStorageUsername;
      // }
      const msg = await requestToAPI(
        `${API_GET_CURRENT_USER_URL}?currentUsername=${currentUsername}`,
        API_Inits({ method: 'GET' }),
      );

      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果不是登录页面，执行

  if (history.location.pathname !== loginPath) {
    let currentUsername = '';
    const localStorageUsername = localStorage.getItem('currentUsername');
    if (localStorageUsername) currentUsername = localStorageUsername;

    const currentUser = await fetchUserInfo(currentUsername);
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState, setInitialState }) => {
  // setLocale('en-US');

  const local_locale = localStorage.getItem('umi_locale');

  // fix error
  if (!local_locale) {
    setLocale('en-US');
    localStorage.setItem('umi_locale', 'en-US');
  }
  // if(initialState?.currentUser)
  if(initialState?.currentUser?.access !== "guest")
    SetupNortification(initialState?.currentUser);
  
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          // <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          //   <LinkOutlined />
          //   <span>OpenAPI 文档</span>
          // </Link>,
          // <Link to="/~docs" key="docs">
          //   <BookOutlined />
          //   <span>业务组件文档</span>
          // </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <Exception403 />,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
