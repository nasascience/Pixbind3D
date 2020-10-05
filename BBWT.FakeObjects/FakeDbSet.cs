namespace BBWT.FakeObjects
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.ComponentModel.DataAnnotations;
    using System.Data.Entity;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Reflection;

    /// <summary>
    /// FakeDbSet
    /// </summary>
    /// <typeparam name="T">IDbSet</typeparam>
    public class FakeDbSet<T> : IDbSet<T> where T : class
    {
        private readonly HashSet<T> data;
        private readonly IQueryable query;
        private int identity = 1;
        private List<PropertyInfo> keyProperties;

        #region constructors
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="startData">start data</param>
        public FakeDbSet(IEnumerable<T> startData = null)
        {
            this.GetKeyProperties();
            this.data = startData != null ? new HashSet<T>(startData) : new HashSet<T>();
            this.query = this.data.AsQueryable();
        }
        #endregion

        #region properties
        Type IQueryable.ElementType
        {
            get { return this.query.ElementType; }
        }

        Expression IQueryable.Expression
        {
            get { return this.query.Expression; }
        }

        IQueryProvider IQueryable.Provider
        {
            get { return this.query.Provider; }
        }

        /// <summary>
        /// Local
        /// </summary>
        public ObservableCollection<T> Local
        {
            get
            {
                return new ObservableCollection<T>(this.data);
            }
        }
        #endregion

        #region public methods
        /// <summary>
        /// Find
        /// </summary>
        /// <param name="keyValues">Find params</param>
        /// <returns>T</returns>
        public virtual T Find(params object[] keyValues)
        {
            if (keyValues.Length != this.keyProperties.Count)
            {
                throw new ArgumentException("Incorrect number of keys passed to find method");
            }

            IQueryable<T> keyQuery = this.AsQueryable<T>();
            for (int i = 0; i < keyValues.Length; i++)
            {
                var x = i; // nested linq
                keyQuery = keyQuery.Where(entity => this.keyProperties[x].GetValue(entity, null).Equals(keyValues[x]));
            }

            return keyQuery.SingleOrDefault();
        }

        /// <summary>
        /// Add
        /// </summary>
        /// <param name="item">T item</param>
        /// <returns>T</returns>
        public T Add(T item)
        {
            this.GenerateId(item);
            this.data.Add(item);
            return item;
        }

        /// <summary>
        /// Remove
        /// </summary>
        /// <param name="item">T item</param>
        /// <returns>T</returns>
        public T Remove(T item)
        {
            this.data.Remove(item);
            return item;
        }

        /// <summary>
        /// Attach
        /// </summary>
        /// <param name="item">T item</param>
        /// <returns>T</returns>
        public T Attach(T item)
        {
            this.data.Add(item);
            return item;
        }

        /// <summary>
        /// Detach
        /// </summary>
        /// <param name="item">T</param>
        public void Detach(T item)
        {
            this.data.Remove(item);
        }

        /// <summary>
        /// Create
        /// </summary>
        /// <returns>T</returns>
        public T Create()
        {
            return Activator.CreateInstance<T>();
        }

        /// <summary>
        /// Create
        /// </summary>
        /// <typeparam name="TDerivedEntity">Derived Entity</typeparam>
        /// <returns> DerivedEntity</returns>
        public TDerivedEntity Create<TDerivedEntity>() where TDerivedEntity : class, T
        {
            return Activator.CreateInstance<TDerivedEntity>();
        }
        #endregion

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return this.data.GetEnumerator();
        }
        #region private methods
        IEnumerator<T> IEnumerable<T>.GetEnumerator()
        {
            return this.data.GetEnumerator();
        }

        private void GetKeyProperties()
        {
            this.keyProperties = new List<PropertyInfo>();
            PropertyInfo[] properties = typeof(T).GetProperties();
            foreach (PropertyInfo property in properties)
            {
                foreach (Attribute attribute in property.GetCustomAttributes(true))
                {
                    if (attribute is KeyAttribute)
                    {
                        this.keyProperties.Add(property);
                    }
                }
            }
        }

        private void GenerateId(T entity)
        {
            // If non-composite integer key
            if (this.keyProperties.Count == 1 && this.keyProperties[0].PropertyType == typeof(int))
            {
                this.keyProperties[0].SetValue(entity, this.identity++, null);
            }
        }
        #endregion
    }
}
