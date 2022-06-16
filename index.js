// Import ThoughtSpot SDK
import './style.css';
import {
  init,
  RuntimeFilterOp,
  EmbedEvent,
  AuthType,
  HostEvent,
  LiveboardEmbed,
  RuntimeFilterOp,
  SearchEmbed,
} from '@thoughtspot/visual-embed-sdk';

import { updateFilterDisplay } from './filter-utils';

let segment = [];

// Initialize embed configuration
init({
  thoughtSpotHost: 'https://thoughtspotpmm.thoughtspot.cloud/',
  authType: AuthType.None,
});

const embed = new SearchEmbed('#embed', {
  dataSources: ['38399c50-02f1-4310-804b-214b81f25333'],
  hideDataSources: true,
});

embed.on(EmbedEvent.Data, (payload) => {
  segment = [];
  console.log(payload.data);
  payload.data.filterGroups?.forEach((filterGroup) => {
    const columnDisplayName = filterGroup.columnInfo.name;
    const columnName = filterGroup.columnInfo.referencedColumns[0].displayName;
    const operator = filterGroup.filters[0].filterContent[0].filterType;
    const values = filterGroup.filters[0].filterContent[0].value.map(
      (item) => item.key
    );

    segment.push({
      columnDisplayName,
      columnName,
      operator,
      values,
    });
  });

  updateFilterDisplay(segment);
});

embed.render();
