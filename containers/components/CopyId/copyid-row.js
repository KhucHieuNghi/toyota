import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import util from '../../util/util';

const popupTimeout = 10000;

export default class CopyIdRow extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      assetId: this.props.row.assetId,
      assetIdCopied: false,
    };

    this.onAssetIdCopy = this.onAssetIdCopy.bind(this);
  }

  onAssetIdCopy (idx, label, assetId, code) {
    this.setState({
      assetIdCopied: true,
    });

    this.assetIdTimeout = setTimeout(() => {
      this.setState({ assetIdCopied: false });

      clearTimeout(this.assetIdTimeout);
    }, popupTimeout);

    const linkBlock = {
      content_section: util.htmlDecode(this.props.section.title),
      link_text: 'Copy ID',
      link_trigger: 'km-vis_copy_id',
      link_type_title: label,
      list_item_index: idx,
      list_layout: 'list',
      asset_id: assetId,
    };

    const args = {
      ...linkBlock,
      ...this.getVehicleBlock(code),
    };
  }

  getVehicleBlock (code) {
    // decode markup coming from teamsite, then strip out the tags
    code = util.htmlDecode(code).replace(/<(?:.|\n)*?>/gm, '');

    const cars = ['yaris', 'yaris ia', 'corolla', 'corolla hatchback', 'camry', 'avalon', '86', 'sienna'];
    const trucks = ['tacoma', 'tundra'];
    const suvs = ['c-hr', 'rav4', 'highlander', '4runner', 'sequoia', 'land cruiser'];
    const hybrids = ['camry hybrid', 'avalon hybrid', 'rav4 hybrid', 'highlander hybrid',
      'prius prime', 'prius', 'prius c', 'prius v', 'mirai'];
    let category;

    if (cars.indexOf(code.toLowerCase()) > -1) {
      category = 'Cars & Minivans';
    }

    if (trucks.indexOf(code.toLowerCase()) > -1) {
      category = 'Trucks';
    }

    if (suvs.indexOf(code.toLowerCase()) > -1) {
      category = 'SUVs & Crossovers';
    }

    if (hybrids.indexOf(code.toLowerCase()) > -1) {
      category = 'Hybrids & FCVs';
    }

    if (category) {
      return ({
        series_brand: 'Toyota',
        series_code: code,
        series_category: category,
      });
    }

    return ({});
  }

  render () {
    const {
      row, idx, title, headline,
    } = this.props;

    return (
      <div className="row">
        <div className="ids">
          <div className="id-block">
            <div className="details">
              <span
                className="label"
                dangerouslySetInnerHTML={{
                  __html: util.htmlDecode(row.label),
                }}
              />
              <span className="id">
                Asset ID:
                {' '}
                {row.assetId}
              </span>
            </div>
            <div className="cta">
              <CopyToClipboard
                onCopy={(e) => this.onAssetIdCopy(idx + 1, row.label, row.assetId, title)}
                text={this.state.assetId}
              >
                <button className={this.state.assetIdCopied ? 'copied' : ''}>
                  <span className="btn-label">Copy ID</span>
                  <i>
                    <svg width="16" height="17" viewBox="0 0 16 17">
                      <defs>
                        <path id="a" d="M15.917.5H16l1.98.028-2.908 8.617-1.825-.636L15.25 2.5H0v-2h15.917z" />
                      </defs>
                      <use fill="#000" fillRule="evenodd" transform="rotate(124 7.755 5.144)" xlinkHref="#a" />
                    </svg>
                  </i>
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
