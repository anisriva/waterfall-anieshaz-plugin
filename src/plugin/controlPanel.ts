/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { t, validateNonEmpty } from '@superset-ui/core';
import { ControlPanelConfig, sections, sharedControls } from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  /**
   * The control panel is split into two tabs: "Query" and
   * "Chart Options". The controls that define the inputs to
   * the chart data request, such as columns and metrics, usually
   * reside within "Query", while controls that affect the visual
   * appearance or functionality of the chart are under the
   * "Chart Options" section.
   *
   * There are several predefined controls that can be used.
   * Some examples:
   * - groupby: columns to group by (tranlated to GROUP BY statement)
   * - series: same as groupby, but single selection.
   * - metrics: multiple metrics (translated to aggregate expression)
   * - metric: sane as metrics, but single selection
   * - adhoc_filters: filters (translated to WHERE or HAVING
   *   depending on filter type)
   * - row_limit: maximum number of rows (translated to LIMIT statement)
   *
   * If a control panel has both a `series` and `groupby` control, and
   * the user has chosen `col1` as the value for the `series` control,
   * and `col2` and `col3` as values for the `groupby` control,
   * the resulting query will contain three `groupby` columns. This is because
   * we considered `series` control a `groupby` query field and its value
   * will automatically append the `groupby` field when the query is generated.
   *
   * It is also possible to define custom controls by importing the
   * necessary dependencies and overriding the default parameters, which
   * can then be placed in the `controlSetRows` section
   * of the `Query` section instead of a predefined control.
   *
   * import { validateNonEmpty } from '@superset-ui/core';
   * import {
   *   sharedControls,
   *   ControlConfig,
   *   ControlPanelConfig,
   * } from '@superset-ui/chart-controls';
   *
   * const myControl: ControlConfig<'SelectControl'> = {
   *   name: 'secondary_entity',
   *   config: {
   *     ...sharedControls.entity,
   *     type: 'SelectControl',
   *     label: t('Secondary Entity'),
   *     mapStateToProps: state => ({
   *       sharedControls.columnChoices(state.datasource)
   *       .columns.filter(c => c.groupby)
   *     })
   *     validators: [validateNonEmpty],
   *   },
   * }
   *
   * In addition to the basic drop down control, there are several predefined
   * control types (can be set via the `type` property) that can be used. Some
   * commonly used examples:
   * - SelectControl: Dropdown to select single or multiple values,
       usually columns
   * - MetricsControl: Dropdown to select metrics, triggering a modal
       to define Metric details
   * - AdhocFilterControl: Control to choose filters
   * - CheckboxControl: A checkbox for choosing true/false values
   * - SliderControl: A slider with min/max values
   * - TextControl: Control for text data
   *
   * For more control input types, check out the `incubator-superset` repo
   * and open this file: superset-frontend/src/explore/components/controls/index.js
   *
   * To ensure all controls have been filled out correctly, the following
   * validators are provided
   * by the `@superset-ui/core/lib/validator`:
   * - validateNonEmpty: must have at least one value
   * - validateInteger: must be an integer value
   * - validateNumber: must be an intger or decimal value
   */

  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'cols',
            config: {
              ...sharedControls.groupby,
              label: t('Dimension'),
              description: t('Dimension to group by'),
            },
          },
        ],
        [
          {
            name: 'metric',
            config: {
              ...sharedControls.metric,
              label: t('Metric Start'),
              // it's possible to add validators to controls if
              // certain selections/types need to be enforced
              validators: [validateNonEmpty],
            },
          },
        ],
        [
          {
            name: 'metric_2',
            config: {
              ...sharedControls.metric_2,
              label: t('Metric Life'),
              // it's possible to add validators to controls if
              // certain selections/types need to be enforced
              validators: [validateNonEmpty],
            },
          },
        ],        
        ['adhoc_filters'],
        [
          {
            name: 'row_limit',
            config: sharedControls.row_limit,
          },
        ],
      ],
    },
    {
      label: t('Customize Chart'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'x_label_text',
            config: {
              type: 'TextControl',
              default: 'Metrics',
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('X Axis Label'),
              description: t('The text you want to see in the chart X - Axis'),
            },
          },
          // {
          //   name: 'x_label_font_size',
          //   config: {
          //     type: 'TextControl',
          //     default: 10,
          //     renderTrigger: true,
          //     // ^ this makes it apply instantaneously, without triggering a "run query" button
          //     label: t('Font Size'),
          //     description: t('The font size for the header'),
          //   },
          // },
        ],
        // [
        //   {
        //     name: 'y_label_font_size',
        //     config: {
        //       type: 'TextControl',
        //       default: 10,
        //       renderTrigger: true,
        //       // ^ this makes it apply instantaneously, without triggering a "run query" button
        //       label: t('Y-Axis Label Font Size'),
        //       description: t('The font size for the y-Axis Label'),
        //     },
        //   }            
        // ],
        [
          {
            name: 'min_max_plot',
            config: {
              type: 'BoundsControl',
              default: [0, null],
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Tick Range Bound'),
              description: t('Min and max tick to start X-Axis'),
            },
          },
        ],
        [
          {
            name: 'tick_interval',
            config: {
              type: 'TextControl',
              default: 2,
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Tick Interval'),
              description: t('Number of intervals of ticks on the X-Axis'),
            },
          }                  
          ,
          {
            name: 'sub_tick_count',
            config: {
              type: 'TextControl',
              default: 10,
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Sub Tick Count'),
              description: t('Number of ticks per intervals on the X-Axis'),
            },
          }                  
        ],        
        [
          {
            name: 'dark_mode',
            config: {
              type: 'CheckboxControl',
              label: t('Dark Mode'),
              renderTrigger: true,
              default: false,
              description: t('A checkbox to change the chart theme.'),
            },
          },
        
          {
            name: 'show_bar_label',
            config: {
              type: 'CheckboxControl',
              label: t('Show Bar Labels'),
              renderTrigger: true,
              default: true,
              description: t('A checkbox to show the bar label metrics.'),
            },
          }
        ],
        [
          {
            name: 'bar_color',
            config: {
              type: 'ColorPickerControl',
              label: t('Bar Color'),
              renderTrigger: true,
              default: {r:41, g: 112, b: 40, a: 100},
              description: t('Pick bar color'),
            },
          },          
        ]
        
      ],
    },
  ],
};

export default config;
