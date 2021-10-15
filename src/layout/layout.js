import React, { useState } from 'react';
import HeaderComponent from './header';
import './layout.css';
// import FooterComponent from './footer'
import { Layout } from 'antd';
import NavBar from './NavBar';

const LayoutComponent = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { Content } = Layout;
  const handleMenu = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Layout className="site-layout" style={{ minHeight: '100vh' }}>
        <HeaderComponent click={handleMenu} />
        <Layout className="site-layout">
          <NavBar collapsed={collapsed} />
          <Content style={{ margin: '16px 16px 0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {props.children}
            </div>
          </Content>
        </Layout>
        {/* <FooterComponent /> */}
      </Layout>
    </>
  )
}

export default React.memo(LayoutComponent);
