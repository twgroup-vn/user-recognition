import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { makeStyles } from '@material-ui/core/styles';
import PostRecognition from '../components/PostRecognition';
import InfoRecognition from '../components/InfoRecognition';
import Feed from '../components/Feed';
import TopReceivers from '../components/TopReceivers';
import TopBadges from '../components/TopBadges';

const useStyles = makeStyles((theme) => ({
    fixed_right_panel: {
        position: 'fixed',
        top: 16,
        right: 0,
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 16px)'
    },
}));

function Home () {
    const classes = useStyles();
    const [balanceTabToShow, setBalanceTabToShow] = useState(0);

    const onHandleTabChange = (tabIndex) => {
        setBalanceTabToShow(tabIndex);
    }

    const badgeSetStatus = true;//setting
    // const coreValueSetStatus = true;//setting
    return (
        <Container>
            <Row className='position-relative justify-content-start'>
                <Col xs={6} md={6} lg={8} style={{padding: '0px'}}>
                    <PostRecognition
                        switchBalanceTab={onHandleTabChange}
                    />
                    <Feed />
                </Col>
                <Col xs={6} md={6} lg={4} style={{padding: '0 32px'}} className={classes.fixed_right_panel}>
                    <InfoRecognition 
                        slideIndex={balanceTabToShow}
                        onHandleChange={onHandleTabChange}
                    />
                    <TopReceivers />
                    {badgeSetStatus && <TopBadges />}
                    {/* {coreValueSetStatus && <TopCoreValues />} */}
                </Col>
            </Row>
        </Container>
        
    )
}

export default Home