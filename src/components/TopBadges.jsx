import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { getBadgeObjectForName, getImageForBadge } from '../assets/Util/BadgesInfo';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    right_column_box: {
        position: 'relative',
        background: '#FFFFFF',
        border: '0.5px solid #EEEEEE',
        borderRadius: 2,
        padding: 20,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    right_column_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexGrow: 1
    },
    right_column_header_text: {
        fontWeight: 700,
        // fontSize: 16,
        color: '#2c2c2c',
        flexGrow: 1
    },
    top_receivers_row_div: {
        position: 'relative',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: 5,
        paddingTop: 5
    },
    top_receivers_name: {
        color: '#2c2c2c',
        // fontSize: 14,
        paddingRight: 40,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    top_receivers_carrots: {
        display: 'flex',
        position: 'absolute',
        right: 0
    },
    top_receivers_carrots_text: {
        color: '#212121',
        fontSize: 14,
        fontWeight: 700
    },
    top_badges_names: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    top_badges_img: {
        width: 20,
        height: 20,
        marginRight: 5
    }
}));

function TopBadges() {
    useEffect(() => {
        axios.get('https://camon.twgroup.vn/api/v1/home/sidebar', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'eyJhbGciOiJSUzI1NiJ9.eyJpZCI6IjE0NWRjNGI3LWQyODEtNDIzNi1hZjYwLWM2MmI3NDk3YmVjYSIsImVtYWlsIjoicGhhdGx0QHR3Z3JvdXAudm4ifQ.Ft8bNFXhOSbFneB_A4_zqzM3QMpzOEpHUo-OuAOJAC-nDqb3M1S0mGtqcMhadbdP8LP0fws9ecK3FNgvazKf1btp6Ojg5hCxORy2Wc8LAohb_cl4T3_DKy44XvYkVKM8zX61WLud2yUcTrpe46cbX80n6ItahSNvvQNtR0j_x-BzeaSr0MX13hrftKqGdFZGG6NKOS9THEHzNLXhkcG3m4vxXv3rNPyeDMQIimw3EF2FNjBNhZJff2Dj0_QtullEm26hf4NrS5ZjZBPJJo6SgSH7-M4hrOtPTAhLB0_QsBJm6W4Oq9OYd-cxe470WpeSz1TIPuVLJV9TEKW95lcDK-SXBH781xwxvr3WLpbK7qe-RdGnEOl1ymnoJAH7TpIWCAsiVUOmob3xjUDrvuylLACQ43k5sfh4au9vch9-AIR74US0uIdJZGfnPeUGc4QMz8rrlztnRhdvLBwErWkqg-lebjICvWg-5GQm6FPmpalNxTBB1QX20B-3Hg1hr8LqiptVWhn6156DSRwxjLCgyaQrsq707fseYZbKDRi35VVus9dMhCTVlQ11SH2TLOpd8n1EeHsL3ESObtdXzNFrVKgKAVnQawWnYM1ZEim4yzaVBbHgKqB2QKCupdj-U6pMH0oVA8t1se0RuRMageF4_TRlAnOC1Oq2z0Lhmv_VAlI'
            }
        }).then((res) => {
            setTopBadges(res.data.data.top_badges)
        })
    }, [])

    const classes = useStyles();

    const [topBadges, setTopBadges] = useState([]);

    const BadgeText = (props) => {
        const badgeObj = getBadgeObjectForName(props.name);
        const badgeImg = getImageForBadge(badgeObj, true);
        return (
          <div className={classes.top_badges_names}>
            <img src={badgeImg} alt={badgeObj.displayName} className={classes.top_badges_img} />
            <div className={classes.top_receivers_name}>{badgeObj.displayName}</div>
          </div>
        );
    };

    return (
        <div className={classes.right_column_box}>
            <div className={classes.right_column_header}>
                <div className={classes.right_column_header_text}>
                    Top Badges
                </div>
            </div>
            <div className='container' style={{marginTop: '10px'}}>
                <div>
                    {
                        (topBadges && topBadges.length > 0) ?
                            topBadges.map((badge) => (
                                <div key={badge.name} className={classNames(
                                    'row',
                                    'justify-content-start',
                                    classes.top_receivers_row_div)}>
                                        <BadgeText name={badge.name} />
                                        <div className={classNames(classes.top_receivers_carrots, classes.top_receivers_carrots_text)}>
                                            {badge.count}
                                        </div>
                                </div>
                        ))
                        : 
                        (
                            <div className="container top_receivers_noname_container">
                                <div className="row justify-content-center medium_icon_popovers">
                                    <span role="img" aria-label="Smirking Face">
                                    🤔
                                    </span>
                                </div>
                                <div className="row justify-content-center top_receivers_noname">
                                    No top badges, yet
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default TopBadges