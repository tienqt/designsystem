import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'rsg-components/Link';
import getUrl from 'react-styleguidist/lib/utils/getUrl';

export function ComponentsListRenderer({ items, useIsolatedLinks = false }) {
    items = items.filter(item => item.name);

    if (!items.length) {
        return null;
    }

    return (
        <ul className="sb1ds-components-list">
            {items.map(({ heading, name, slug, content }) => (
                <li
                    className={classNames(
                        heading && 'sb1ds-components-list__item--heading',
                        'sb1ds-components-list__item',
                    )}
                    key={name}
                >
                    <Link
                        noUnderline={true}
                        className={classNames('sb1ds-components-list__link', {
                            'sb1ds-components-list__link--heading': heading,
                        })}
                        href={getUrl({
                            name,
                            slug,
                            anchor: !useIsolatedLinks,
                            isolated: useIsolatedLinks,
                        })}
                    >
                        {name}
                    </Link>
                    {content}
                </li>
            ))}
        </ul>
    );
}

ComponentsListRenderer.propTypes = {
    items: PropTypes.array.isRequired,
    useIsolatedLinks: PropTypes.bool.isRequired,
};

export default ComponentsListRenderer;
