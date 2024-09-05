import React, { useEffect } from "react";
import { Layout, Typography } from "antd";
import CurrencyConverter from "./components/CurrencyConverter";
import { fetchCsrfToken } from "./utils/csrfToken.util";

const { Header, Content } = Layout;
const { Title } = Typography;
const App: React.FC = () => {
  useEffect(() => {
    fetchCsrfToken();
  }, []);

  return (
    <Layout>
      <Header style={{ color: "white", textAlign: "center" }}>
        <Title level={2} style={{ color: "white", margin: 0 }}>
          Currency Converter
        </Title>
      </Header>
      <Content
        style={{ padding: "50px", display: "flex", justifyContent: "center" }}
      >
        {localStorage.getItem("csrfToken") && <CurrencyConverter />}
      </Content>
    </Layout>
  );
};

export default App;
