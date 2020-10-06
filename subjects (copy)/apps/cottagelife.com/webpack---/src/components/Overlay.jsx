// @flow
/* eslint jsx-a11y/no-static-element-interactions: 0, jsx-a11y/click-events-have-key-events: 0 */

import {h, Component} from 'preact';
import {stripExtraWhiteSpace} from 'utils';
import {overlayPadding} from 'cssVariables';

import 'components/Overlay.css';

import type { Embeddable, Viewport, ScrollPosition, Device, Size } from '../types';

type Props = {
  children?: Element[],
  emb: Embeddable,
  device: Device,
  isVisible: boolean,
  onClose: () => void,
  scrollPosition: ScrollPosition,
  size: Size,
  viewport: Viewport,
};

const padding = parseInt(overlayPadding, 10) * 2;

export default class Overlay extends Component {
  props: Props;
  static defaultProps: {children: Element[]};

  getScrollWrapperStyle() {
    const { device, isVisible, viewport, size, scrollPosition } = this.props;
    const { isIOS, isOldIOS } = device;

    if (
      isVisible &&
      (isOldIOS || (isIOS && size.height > 0 && size.height + padding > viewport.height))
    ) {
      // In iOS 9 and below, fixed-position elements like the scrollWrapper jump to the full height
      // of the page when an input is focused. In iOS 10, fixed positioning works as expected, other
      // than when a fixed-position element has overflow scrolling and a child input is focused. To
      // get around these quirks, we position the scrollWrapper absolutely and set the scrollWrapper
      // height such that it has no overflow scrolling. This means that instead of scrolling inside
      // the scrollWrapper, the user can scroll around the host page itself, along with the overlay.
      return {
        height: Math.max(viewport.height, size.height + padding),
        left: scrollPosition.left,
        overflow: 'visible',
        position: 'absolute',
        top: scrollPosition.top,
      };
    } else {
      return {};
    }
  }

  render() {
    const {emb, onClose, isVisible, children} = this.props;

    const containerClassName = stripExtraWhiteSpace(`
      ub-emb-overlay
      ${isVisible ? 'ub-emb-visible' : ''}
      ${emb.isMobile ? 'ub-emb-mobile' : ''}
    `);

    return (
      <div className={containerClassName}>
        <div className="ub-emb-backdrop" onClick={onClose} />

        <div
          className="ub-emb-scroll-wrapper"
          onClick={onClose}
          style={this.getScrollWrapperStyle()}
        >
          {children}
        </div>
      </div>
    );
  }
}

Overlay.defaultProps = {
  children: [],
};
