import notifier from 'node-notifier';
import path from 'path';

import constants from './config/constants';
import './config/database';

import app from './app';

app.listen(constants.PORT, err => {
  if (err) {
    if (process.env.NODE_ENV === 'dev') {
      notifier.notify({
        title: 'FBA Service',
        message: err.message,
        icon: path.join(__dirname, 'assets/img/icon.png'),
      });
    }
    throw err;
  } else {
    console.log(`
      Service is up on port ${constants.PORT} 🐳
      ---
      Running on ${process.env.NODE_ENV} ☎️
      ---`);
    if (process.env.NODE_ENV === 'dev') {
      notifier.notify({
        title: 'FBA Service',
        message: `Service is up on port ${constants.PORT} 🎉`,
        icon: path.join(__dirname, 'assets/img/icon.png'),
      });
    }
  }
});
