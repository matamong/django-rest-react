import React, { useEffect, useMemo, useCallback } from 'react';
import { Line } from 'progressbar.js';

const wrapper = document.createElement('div');

const ProgressBarLinePlain = ({ animate }) => {
  const wrapper = document.createElement('div');

  const bar = useMemo(
      () =>
          new Line(wrapper, {
              strokeWidth: 6,
              easing: 'easeInOut',
              duration: 1400,
              color: '#FFEA82',
              trailColor: '#eee',
              trailWidth: 1,
              svgStyle: null,
              text: {
                  style: {
                      // Text color.
                      // Default: same as stroke color (options.color)
                      color: '#999',
                      position: 'inherit',
                      padding: 0,
                      margin: 0,
                      transform: null,
                      fontSize: '2px',
                      textAlign: 'right',
                      fontWeignt: '300'
                  },
                  autoStyleContainer: false
              },
              from: {color: '#d7e4fd'},
              to: {color: '#011f75'},
              step: (state, bar) => {
                  bar.path.setAttribute('stroke', state.color);
                  const value = Math.round(bar.value() * 100);
                  if (value === 0) {
                      bar.setText('안 해봤어요.');
                  } if (value === 20) {
                      bar.setText('경험은 있어요.');
                  } if (value === 40) {
                      bar.setText('1인분은 해요.');
                  } if (value === 60) {
                      bar.setText('주캐예요.');
                  } if (value === 80) {
                      bar.setText('자신 있어요.');
                  } if (value === 100) {
                      bar.setText('캐리 가능');
                  }

                  bar.text.style.color = state.color;
              }
          }),
      []
  );

  const node = useCallback(node => {
      if (node) {
          node.appendChild(wrapper);
      }
  }, []);

  useEffect(() => {
      bar.animate(animate);
  }, [animate, bar]);

  return <div ref={node} />;
};

export default ProgressBarLinePlain;