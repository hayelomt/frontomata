// import Layout from '../core/ui/layout/Layout';

// const HomePage = () => {
//   return <Layout>HomePage</Layout>;
// };

// export default HomePage;

import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

export default function MyApp() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <DateTimePicker
        onChange={onChange}
        value={value}
        disableClock
        format="y-MM-dd"
      />
    </div>
  );
}
