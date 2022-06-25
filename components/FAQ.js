import React from "react";



import styles from '../styles/faq.module.css'

export default function FAQ({file}) {
  
  return (
      <div className={styles.markdownBody} >
        <div className=" prose lg:prose-md mx-auto">

       
          <article dangerouslySetInnerHTML={{ __html: file }}>

          </article>
          </div>
      </div>
  );
}



function Code(props) {
  return <code className="text-sm text-red-500">{props.children}</code>;
}
