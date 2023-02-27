namespace BLL.Interfaces
{
    /// <summary>
    /// Represents an interface to data transfer objects.
    /// </summary>
    public interface IDtoMapper<T>
    {
        /// <summary>Converts to model.</summary>
        /// <returns>Model with type T.</returns>
        T ToModel();
    }
}
