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
        top: 75,
        right: 0,
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 75px)'
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
        <Container style={{marginTop: '35px'}}>
            <Row className='position-relative justify-content-start'>
                <Col xs={6} md={6} lg={8}>
                    <PostRecognition />
                    <Feed />
                </Col>
                <Col xs={6} md={6} lg={4} className={classes.fixed_right_panel}>
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