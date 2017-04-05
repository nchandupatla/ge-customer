'use strict';

import angular from 'angular';
import SettingsController from './settings.controller';

export default angular.module('geProfileApp.settings', [])
  .controller('SettingsController', SettingsController)
  .name;
