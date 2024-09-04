import React from 'react';
import { Layout, Typography } from 'antd';
import CurrencyConverter from './components/CurrencyConverter';

const { Header, Content } = Layout;
const { Title } = Typography;



const App: React.FC = () => {
  return (
    <Layout>
      <Header style={{ color: 'white', textAlign: 'center' }}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          Currency Converter
        </Title>
      </Header>
      <Content
        style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}
      >
        <CurrencyConverter />
      </Content>
    </Layout>
  );
};

export default App;
