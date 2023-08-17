/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OidcClientProvidersRoute extends Route {
  @service store;

  model() {
    const model = this.modelFor('vault.cluster.access.oidc.clients.client');
    return this.store
      .query('oidc/provider', {
        allowed_client_id: model.clientId,
      })
      .catch((err) => {
        if (err.httpStatus === 404) {
          return [];
        } else {
          throw err;
        }
      });
  }
}
