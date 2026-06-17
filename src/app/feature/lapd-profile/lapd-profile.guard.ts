import { CanDeactivateFn } from '@angular/router';
import { LapdProfileSettingContainer } from './container/lapd-profile-setting/lapd-profile-setting.container';

export const lapdProfileUnsavedGuard: CanDeactivateFn<LapdProfileSettingContainer> = (
  component,
) => {
  if (!component?.form) {
    return true;
  }

  if (!component.form.dirty || component.isSaving) {
    return true;
  }

  return window.confirm('You have unsaved changes. Leave this page?');
};
