import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ConfigModuleOptions } from 'src/interfaces/config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ConfigModuleOptions>()
    .setFactoryMethodName('createConfigOptions')
    .build();
