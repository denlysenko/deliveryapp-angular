import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import { AppOptions } from 'nativescript-angular/platform-common';

import { AppModule } from './app/app.module';

const options: AppOptions = {};

if (module['hot']) {
  const hmrUpdate = require('nativescript-dev-webpack/hmr').hmrUpdate;

  options.hmrOptions = {
    moduleTypeFactory: () => AppModule,
    livesyncCallback: platformReboot => {
      console.log('HMR: Sync...');
      hmrUpdate();
      setTimeout(platformReboot, 0);
    }
  };
  hmrUpdate();

  module['hot'].accept(['./app/app.module']);
}
platformNativeScriptDynamic(options).bootstrapModule(AppModule);
