/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class OidcScopeDetailsController extends Controller {
  @service router;
  @service flashMessages;

  @action
  async delete() {
    try {
      await this.model.destroyRecord();
      this.flashMessages.success('Scope deleted successfully');
      this.router.transitionTo('vault.cluster.access.oidc.scopes');
    } catch (error) {
      this.model.rollbackAttributes();
      const message = error.errors ? error.errors.join('. ') : error.message;
      this.flashMessages.danger(message);
    }
  }
}
