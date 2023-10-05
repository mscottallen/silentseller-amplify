import React, { useState } from 'react';
import { API } from 'aws-amplify';

const Dashboard = () => {
  const [apiKeys, setApiKeys] = useState({
    openAI: '',
    etsy: '',
    shopify: '',
    printify: '',
    printful: '',
    midjourney: '',
    discord: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApiKeys({
      ...apiKeys,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      // Here you'd call the AWS Lambda function to store these keys in DynamoDB
      const response = await API.post('yourApiName', '/storekeys', { body: apiKeys });
      console.log('Keys saved:', response);
    } catch (error) {
      console.error('Error saving keys:', error);
    }
  };

  return (
    <div>
      <h1>API Keys Dashboard</h1>
      <label>
        OpenAI: 
        <input type="text" name="openAI" value={apiKeys.openAI} onChange={handleChange} />
      </label>
      <br />
      <label>
        Etsy: 
        <input type="text" name="etsy" value={apiKeys.etsy} onChange={handleChange} />
      </label>
      <br />
      <label>
        Shopify: 
        <input type="text" name="shopify" value={apiKeys.shopify} onChange={handleChange} />
      </label>
      <br />
      <label>
        Printify: 
        <input type="text" name="printify" value={apiKeys.printify} onChange={handleChange} />
      </label>
      <br />
      <label>
        Printful: 
        <input type="text" name="printful" value={apiKeys.printful} onChange={handleChange} />
      </label>
      <br />
      <label>
        Midjourney: 
        <input type="text" name="midjourney" value={apiKeys.midjourney} onChange={handleChange} />
      </label>
      <br />
      <label>
        Discord: 
        <input type="text" name="discord" value={apiKeys.discord} onChange={handleChange} />
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Dashboard;
