import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
    {
        title: '跨平台、高性能、可视化',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                跨平台高性能的<code>.NET8</code>，简洁明了的web管理页面，安全的SSL加密通信
            </>
        ),
    },
    {
        title: '打洞、中继、和穿透',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                TCP+UDP打洞、服务器中继、服务器穿透，简单几步，将打洞和中继集成到你自己的项目中
            </>
        ),
    },
    {
        title: '组网和转发',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                虚拟网卡组网，端口转发访问，均支持TCP+UDP及其上层协议
            </>
        ),
    },
];

function Feature({ Svg, title, description }) {
    return (
        <div className={clsx('col col--4')}>
            <div style={{ border: '1px solid #ddd' }}>
                <div className="text--center">
                    <Svg className={styles.featureSvg} role="img" />
                </div>
                <div className="text--center padding-horiz--md">
                    <Heading as="h3">{title}</Heading>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
