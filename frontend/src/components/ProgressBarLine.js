import React, { useEffect, useMemo, useCallback } from 'react';
import { Line } from 'progressbar.js';


const ProgressBarLine = ({ animate }) => {
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
                    },
                    autoStyleContainer: false
                },
                from: {color: '#FFEA82'},
                to: {color: '#ED6A5A'},
                step: (state, bar) => {
                    bar.path.setAttribute('stroke', state.color);
                    var value = Math.round(bar.value() * 100);
                    if (value === 0) {
                        bar.setText('즐겜러');
                    } if (value === 20) {
                        bar.setText('즐겜러');
                    } if (value === 40) {
                        bar.setText('승리 지향 즐겜러');
                    } if (value === 60) {
                        bar.setText('승리 지향 즐겜러');
                    } if (value === 80) {
                        bar.setText('빡겜러');
                    } if (value === 100) {
                        bar.setText('빡겜러');
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

export default ProgressBarLine;