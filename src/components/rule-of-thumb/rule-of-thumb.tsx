import './rule-of-thumb.scss';
import { useInitComponent } from '../../hooks/componentInitialization';
import { IMAGE_STORAGE } from '../../constants/urls';
import { THUMBS_DOWN, THUMBS_UP } from '../../constants/imagesNames';
import { SET_VOTE, VOTE } from '../../actions/ruleOfThumbs';


const RuleOfThumb = () => {
 
    const [state, dispatch] = useInitComponent();
    
    return (
        <div >
            <div>
                <div className='container__title'>Previous Rulings</div>
            </div>
            <div className='container__column'>
                {
                    state.items.map((i:any) => 
                        <div style={getImageUrl(i.picture)} className='container__item' key={i.id}>
                            <div className='item__top'>
                                <div className='item__name'>
                                    <img className={getThumbsClass(i.votes)} src={getThumbsImage(i.votes)}></img>
                                </div>
                                <div className='item__details'>
                                    <img className='details__image' src={getImage(i.picture)}></img>
                                    <div className='item__detailsname'>
                                        <span>{i.name}</span>
                                        <div className='item__description'>{getDescription(i.description)}</div>
                                    </div>
                                    <div className='item__votesection'>
                                        <div className='item__updatedtime'>{getLastTimeUpdate(i)}</div>
                                        <div style={i.vote === 'DONE' ? hiddenStyle : {}} className='item_thumbssection'>
                                            <img onClick={() => dispatch(SET_VOTE(i.id, 'UP'))} style={i.vote && i.vote === 'UP' ? selectedStyle : {}} className='item__thumbs-positive' src={`${IMAGE_STORAGE}/${THUMBS_UP}`}></img>
                                            <img onClick={() => dispatch(SET_VOTE(i.id, 'DOWN'))} style={i.vote && i.vote === 'DOWN' ? selectedStyle : {}} className='item__thumbs-negative' src={`${IMAGE_STORAGE}/${THUMBS_DOWN}`}></img>
                                            <div onClick={() => vote(i, dispatch) } className='item__votebutton'>Vote Now</div>
                                        </div>
                                        <div style={i.vote !== 'DONE' ? hiddenStyle : {}} className='item_thumbssection'>
                                            <div onClick={() => dispatch(SET_VOTE(i.id, null)) } className='item__votebutton'>Vote Again</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='item__votesummary'>
                                <div style={getSummaryVoteWidth(Number.parseFloat(getVotePercentage(i.votes)[0]))} className='item__votesummarypositive'>
                                    <img className='item__thumbs ' src={`${IMAGE_STORAGE}/${THUMBS_UP}`}></img>
                                    <span>{i.votes ? `${getVotePercentage(i.votes)[0]}%` : null}</span>
                                </div>
                                <div style={getSummaryVoteWidth(Number.parseFloat(getVotePercentage(i.votes)[1]))} className='item__votesummarynegative'>
                                    <span>{i.votes ? `${getVotePercentage(i.votes)[1]}%` : null}</span>
                                    <img className='item__thumbs' src={`${IMAGE_STORAGE}/${THUMBS_DOWN}`}></img>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const getSummaryVoteWidth = (percentage: number) => ({width: `${percentage}%`});

const getVotePercentage = (votes:any) => {
    const positive = (votes.positive / (votes.positive + votes.negative)) * 100; 
    const negative = (votes.negative / (votes.positive + votes.negative) * 100); 
    return [positive.toFixed(2), negative.toFixed(2)];
} 

const vote = (item:any, dispatch:any) =>  item.vote !== null ?  dispatch(VOTE(item.id)) : null;

const getImage = (imageName:string) =>  `${IMAGE_STORAGE}/${imageName}`;

const getImageUrl = (imageName:string) =>  ({ backgroundImage:`url(${IMAGE_STORAGE}/${imageName})`, backgroundRepeat: 'no-repeat' });

const getThumbsImage = (votes:any) => votes && votes.positive > votes.negative 
                                            ? `${IMAGE_STORAGE}/${THUMBS_UP}`: `${IMAGE_STORAGE}/${THUMBS_DOWN}`;

const getThumbsClass = (votes:any) => votes && votes.positive > votes.negative 
                                            ? `item__thumbs item__thumbs-positive`
                                            : `item__thumbs item__thumbs-negative`;

const getLastTimeUpdate = (item:any) => {

    const lastUpdate = new Date(item.lastUpdated);
    const today  = Date.now();
    const datesDifference = today - lastUpdate.getTime();
    const days = datesDifference / (1000 * 60 * 60 * 24);

    if(days >= 365) {
        return `${Math.round(days/365)} years ago in ${item.category}`;
    } else if(days >= 30) {
        return `${Math.round(days/30)} months ago in ${item.category}`;
    } else if(days >= 5) {
        return `${Math.round(days)} days ago in ${item.category}`;
    } else {
        return '';
    }

}     

const getDescription  = (description:string) => description && description.length > 58 
                                                        ? `${description.substring(0, 58)}...`
                                                        : description;

const selectedStyle = { border: 'solid 1px white'};                          

const hiddenStyle = { display: 'none'};                          

export default RuleOfThumb;
