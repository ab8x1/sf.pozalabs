export default [
    {
        title: '1. What is a Sentinel?',
        content: `
        <p>
            In order to open a superfluid stream, one needs to provide an additional buffer, as you can see on superfluid’s send stream page when you try to configure one.
        </p>
        <img src="/faq/1.1.png" width={551} height={112} alt="faq img" />
        <p>
            This buffer guarantees that even if you fail to cancel the stream, there will still be some funds to cover the outgoing money flow. If you don’t close your own stream, a Sentinel does that for you and is rewarded with the remaining buffer. Each token (on each chain) has its own Sentinel. In a sense, a Sentinel in the Superfluid ecosystem is similar to a validator in the Ethereum ecosystem or a miner for Bitcoin. All of them are providing valuable services to the protocol they’re a part of, and they’re being rewarded for it.
        </p>
        `
    },
    {
        title: '2. How to become a Sentinel?',
        content: `
        <p>
            In fact, there are three Sentinel subgroups (Pirate, Pleb and Patrician) but for simplicity’s sake and purposes of this DAO concept, we refer to “Sentinel” as the primary closer of insolvent streams (which to be specific would be the Patrician In Charge, or PIC). In order to become a Sentinel you need to put out some funds as a stake (just like an Ethereum validator). If someone already is the Sentinel, you need to outbid them by offering a higher stake than theirs. These funds are what then covers insolvent streams if the running Sentinel fails to close them.
        </p>
        `
    },
    {
        title: '3. How profitable is it to run a Sentinel?',
        content: `
        <p>
            The answer to this question depends on two factors and can be quite tricky to answer. However, the dashboard you see above provides a pretty good estimation on the APR you can get for running a Sentinel. It’s calculated according to this formula:
        </p>
        <img src="/faq/3.1.png" width={732} height={63} alt="faq img" />
        <p>
            The calculation for 1 month is analogous, we sum all rewards in the last 30 days and multiply it by 12.
        </p>
        <p>
            This APR doesn’t show you the “pure” profit of becoming a Sentinel, it’s more of a gross profit. To get the net profit, one needs to subtract the cost of running the Sentinel algorithm that sends out transactions to the network. The cost of those depends on the network congestion and the price of the native chain currency (e.g. ETH for Ethereum or Matic for Polygon). There are a lot of small streams going insolvent which only have tiny rewards - closing them is often unprofitable as the reward amount is less than the gas cost of the transaction. Example:
        </p>
        <img src="/faq/3.2.png" width={1309} height={110} alt="faq img" />
        <p>
            Closing of this stream had a reward of 0.002 Matic tokens. Where as it’s gas cost was 0.036 (which is 18x more):
        </p>
        <img src="/faq/3.3.png" width={811} height={63} alt="faq img" />
        <p>
            On the dashboard we describe such transactions as “unprofitable” and you can see how many of them each token has.
            Then, you must consider that transactions for closing streams sometimes timeout or fail in some other way and the Sentinel sends out a new one with even more gas (these failed transactions are not accounted for in the dashboard).
        </p>
        <p>
            Luckily, there is another type of a transaction, one which we’ve called a Jackpot transaction - when a reward is so high it makes up for a lot of unprofitable ones, like this one:
        </p>
        <img src="/faq/3.4.png" width={1320} height={54} alt="faq img" />
        <p>
            or this one:
        </p>
        <img src="/faq/3.5.png" width={1313} height={50} alt="faq img" />
        <p>You can check out the liquidations yourself at: <a href="https://toga.superfluid.finance/" target="_blank">https://toga.superfluid.finance/</a></p>
        `
    },
    {
        title: '4. What’s the purpose of this DAO concept?',
        content: `
        <p>
            As you can see from the formula in the previous, the Sentinel APR lowers as the stake increases. This means that a potential bidding war between two people who both want to become and stay the Sentinel comes at the cost of lowering the APR for the ultimate winner. It may even be significantly lower than if both of the competitors shared the original APR. Consider following two following scenarios:
        </p>
        <p>
            Scenario 1:
        </p>
        <img src="/faq/4.1.png" width={1600} height={475} alt="faq img" />
        <p>
            Alice is the current Sentinel for DAIx Super Token with $1,000 at stake (1,000 DAix). She is willing to stay the Sentinel for as much as $10,000 - that’s how much she’s got in her wallet. The current APR is 12% (excluding the unprofitable transactions). The monthly rewards (based on last 30 days) are $10, which over the course of a year amounts to $120 - a 12% APR.
        </p>
        <p>
            However, Bob sees this high APR and he’d also like to become a Sentinel himself. He’s also got $10,000 that he’s willing to fight Alice with.
        </p>
        <p>
            Bob starts by outbidding Alice and becoming the Sentinel with $2,000 at stake. Because the amount of monthly rewards didn’t change (but the initial investment did), now the APR is only half of what it was before, i.e. 6%. </br>
            Alice notices that she’s been outbid and outbides Bob by another $1,000. The APR lowers again. The process continues until one of them becomes the Sentinel with $10,000 at stake. By this time, the APR has fallen from the initial 12% to 1.2% (since the stake is now 10x bigger than at the start). Although one of the competitors won, they’ve done so at a cost of lowering their APR considerably.
        </p>
        <p>
            Scenario 2:
        </p>
        <img src="/faq/4.2.png" width={1505} height={636} alt="faq img" />
        <p>
            Alice is the current Sentinel for DAIx Super Token with $1,000 at stake (1,000 DAix). Bob and Carol would both like to become the Sentinel but each only has $600 which is not enough to outbid Alice on its own. They agree to pool their funds based and outbid Alice together. Carol transfers his funds to Bob and she outbids Alice, becoming the new Sentinel with a $1,200 stake.
        </p>
        <p>
            Scenario 3:
        </p>
        <p>
            Alice has some spare funds and could potentially become a Sentinel. However, running and maintaining a Sentinel requires some proper infrastructure, maintenance time and technical-know how. It seems like a lot of a hassle, therefore she takes no action.
        </p>
        <img src="/faq/4.3.png" width={894} height={483} alt="faq img" />
        <p>
            All three of these scenarios have their drawbacks for all of the participants. In the first scenario, no matter who becomes the Sentinel, the APR got so lowered by bidding war that it’s almost not worth it to run and maintain a running Sentinel instance. In the second scenario, Alice got outbid and now receives nothing while Bob now is responsible for not only his funds but that of Carol as well - while Carol is left to wonder whether or not Bob won’t try to attempt some sort of a scam. In the third scenario, Alice does not invest her money because running a Sentinel is too much trouble for her.
        </p>
        <p>
            Sentinel DAO aims to solve these kinds of problems by allowing users to pool their funds in order to become a Sentinel.
        </p>
        <p>
            Now, let’s examine how each of those scenarios is different with the Sentinel DAO in place.
        </p>
        <p>
            Scenario 1 with DAO:
        </p>
        <img src="/faq/4.4.png" width={1463} height={519} alt="faq img" />
        <p>
            Alice is the current Sentinel with $1,000 at stake. Bob pools his funds with hers and they can now share the 12% APR between the two of them, giving them 6% each (which is way more than the 1.2% in the original scenario). Since both of them know they have spare $9,000 they decide not to outbid each other and invest these funds elsewhere.
        </p>
        <p>
            Scenario 2 with DAO:
        </p>
        <img src="/faq/4.5.png" width={1236} height={603} alt="faq img" />
        <p>
            Alice is the current Sentinel with $1,000 at stake. Bob and Carol can either pool their funds with Alice’s (if she’s also a part of the DAO) and share the APR between the 3 of them or outbid her with $1,200 safely kept in the DAO’s smart contract. I mean, as safe as you can get in DeFi.
        </p>
        <p>
            Scenario 3 with DAO:
        </p>
        <img src="/faq/4.6.png" width={1043} height={275} alt="faq img" />
        <p>
            Alice pools her funds with the existing DAO members to share the APR. The DAO takes care of the running Sentinel instance.
        </p>
        `
    },
    {
        title: '5. I want to know more about how Sentinels work.',
        content: `
            <p>
                You can read about it more in the official Superfluid docs. <a href="https://docs.superfluid.finance/superfluid/sentinels/liquidations-and-toga" target="_blank">Here</a> you can find a more detailed explanation about how Sentinels work and <a href="https://docs.superfluid.finance/superfluid/sentinels/running-a-sentinel" target="_blank">here</a> a step-by-step guide on how to run one.
            </p>
        `
    }
]