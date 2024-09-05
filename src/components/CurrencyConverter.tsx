import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Select, message, Card, Typography } from "antd";
import axios from "axios";
import { fetchCsrfToken } from "../utils/csrfToken.util";

const { Option } = Select;
const { Title, Text } = Typography;

interface CurrencyConverterProps {}

const CurrencyConverter: React.FC<CurrencyConverterProps> = () => {
  const [sourceCurrency, setSourceCurrency] = useState<string>("USD");
  const [targetCurrency, setTargetCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<number>(1);
  const [convertedValue, setConvertedValue] = useState<string>("");
  const [currenciesList, setCurreciesList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_CURRENCY_SERVICE_URL}`,
          {
            headers: {
              Authorization: `ApiKey ${process.env.REACT_APP_CURRENCY_API_KEY}`,
            },
          }
        );
        setCurreciesList(res.data);
      } catch (error) {
        message.error("Error fetching currencies list");
      }
    })();
  }, []);

  const handleConvert = useCallback(async () => {
    try {
      const csrfToken = localStorage.getItem("csrfToken");
      if (csrfToken !== null) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_CURRENCY_CONVERT_ENDPOINT}`,
          {
            params: { sourceCurrency, targetCurrency, amount },
            headers: {
              "X-CSRF-Token": csrfToken || "",
            },
          }
        );
        setConvertedValue(response.data.convertedAmount);
      }
    } catch (error: any) {
      if (error.response.data.status === 403) {
        await fetchCsrfToken();
        handleConvert();
      }
    }
  }, [amount, sourceCurrency, targetCurrency]);

  useEffect(() => {
    handleConvert();
  }, [amount, handleConvert]);

  const options = currenciesList
    .filter((currency: any) => currency.active) // Filter active currencies
    .map((currency: any) => (
      <Option key={currency.code} value={currency.code}>
        {currency.code}
      </Option>
    ));
  return (
    <div>
      <Form layout="vertical" onFinish={handleConvert}>
        <Form.Item label="Source Currency" rules={[{ required: true }]}>
          <Select
            showSearch
            value={sourceCurrency}
            onChange={(value) => setSourceCurrency(value)}
            placeholder="Select source currency"
          >
            {options}
          </Select>
        </Form.Item>

        <Form.Item label="Target Currency" rules={[{ required: true }]}>
          <Select
            value={targetCurrency}
            onChange={(value) => setTargetCurrency(value)}
            placeholder="Select target currency"
          >
            {options}
          </Select>
        </Form.Item>

        <Form.Item
          label="Amount"
          rules={[
            { required: true, message: "Please input an amount" },
            {
              type: "number",
              min: 0.01,
              message: "Amount must be greater than zero",
            },
          ]}
        >
          <Input
            min={0}
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Enter amount"
          />
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" htmlType="submit">
            Convert
          </Button>
        </Form.Item>
      </Form>

      {convertedValue && (
        <Card
          style={{ marginTop: 20, textAlign: "center" }}
          bordered={false}
          hoverable
        >
          <Title level={4}>Conversion Result</Title>
          <Text>
            {amount} {sourceCurrency} equals
          </Text>
          <Title level={2}>{convertedValue}</Title>
          <Text>in {targetCurrency}</Text>
        </Card>
      )}
    </div>
  );
};

export default CurrencyConverter;
